import { Request } from 'express';
import fs from 'fs';
import { StorageEngine } from 'multer';

const _getDestination: Options['destination'] = (_req, _file, cb) => {
  cb(null, '/dev/null');
};

const MyCustomStorage = (opts: Options): StorageEngine => ({
  _handleFile(req, file, cb) {
    const getDestination = opts.destination || _getDestination;
    getDestination(req, file, (err: Error | null, path: string) => {
      if (err) return cb(err);

      const outStream = fs.createWriteStream(path);

      file.stream.pipe(outStream);
      outStream.on('error', cb);
      outStream.on('finish', function () {
        cb(null, {
          path: path,
          size: outStream.bytesWritten,
        });
      });
    });
  },
  _removeFile(_req, file, cb) {
    fs.unlink(file.path, cb);
  },
});

interface Options {
  destination?: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void
  ) => void;
}

export const strageEngine = (opts: Options) => {
  return MyCustomStorage(opts);
};
