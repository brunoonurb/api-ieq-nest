import * as bcrypt from 'bcrypt';

class Crypt {
  async hash(data: string | Buffer, saltOrRounds: string | number) {
    return await bcrypt.hash(data, saltOrRounds);
  }

  async compare(data: string | Buffer, encrypted: string) {
    return await bcrypt.compare(data, encrypted);
  }

  async compareSync(data: string | Buffer, encrypted: string) {
    return await bcrypt.compareSync(data, encrypted);
  }

}
export { Crypt };
