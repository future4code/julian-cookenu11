import * as bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

export class HashManager {
    public async hash(text: string): Promise<string> {
        const rounds: number = Number(process.env.BCRYPT_COST);
        const salt: string = await bcrypt.genSalt(rounds);
        const result: string = await bcrypt.hash(text, salt);

        return result;
    }

    public async compare(text: string, hash: string): Promise<boolean> {
        const result: boolean = await bcrypt.compare(text, hash);
        return result;
    }
}