import { ClientProxy } from '@nestjs/microservices';
import { catchError, EMPTY } from 'rxjs';
import { HttpException } from '@nestjs/common';

export async function sendMessage(
  channel: ClientProxy,
  name: string,
  data: any = '',
) {
  try {
    return await new Promise((resolve, reject) =>
      channel
        .send(name, data)
        .pipe(
          catchError((err) => {
            reject(err);
            return EMPTY;
          }),
        )
        .subscribe(resolve),
    );
  } catch (err) {
    if (err.custom) {
      throw new HttpException(err.message, err.status);
    } else {
      throw err;
    }
  }
}
