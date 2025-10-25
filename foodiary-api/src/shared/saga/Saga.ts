import { Injectable } from '@kernel/decorators/Injectable';

type CompensationFn = () => Promise<void>;

@Injectable()
export class Saga {
  private compensations: CompensationFn[] = [];

  addCompensation(fn: CompensationFn) {
    this.compensations.push(fn);
  }

  async run<T>(fn: () => Promise<T>) {
    try {
      return await fn();
    } catch (error) {
      await this.compesate();
      throw error;
    }
  }

  async compesate() {
    for await (const compensation of this.compensations.reverse()) {
      try {
        await compensation();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Saga compensation failed:', error);
      }
    }
  }
}
