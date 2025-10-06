import { OnApplicationBootstrap } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { AddTableDto } from '../../tables/dto/add-table.dto';

export class StartupLogicService implements OnApplicationBootstrap {
  constructor(@InjectConnection() private connection: Connection) {}

  createTable(number: number): AddTableDto {
    const table: AddTableDto = new AddTableDto();
    table.number = number;
    return table;
  }

  async addTable(number: number) {
    const tableModel = this.connection.models['Table'];

    const alreadyExists = await tableModel.find({ number });
    if (alreadyExists.length > 0) {
      throw new Error('Table already exists.');
    }

    return tableModel.create(this.createTable(number));
  }

  async onApplicationBootstrap() {
    try {
      await this.addTable(1);
    } catch (e) {
    }
    try {
      await this.addTable(2);
    } catch (e) {
    }
    try {
      await this.addTable(3);
    } catch (e) {
    }
    try {
      await this.addTable(4);
    } catch (e) {
    }
    try {
      await this.addTable(5);
    } catch (e) {
    }
    try {
      await this.addTable(6);
    } catch (e) {
    }
    try {
      await this.addTable(7);
    } catch (e) {
    }
    try {
      await this.addTable(8);
    } catch (e) {
    }
    try {
      await this.addTable(9);
    } catch (e) {
    }
    try {
      await this.addTable(10);
    } catch (e) {
    }
    try {
      await this.addTable(11);
    } catch (e) {
    }
    try {
      await this.addTable(12);
    } catch (e) {
    }
    try {
      await this.addTable(13);
    } catch (e) {
    }
    try {
      await this.addTable(14);
    } catch (e) {
    }
    try {
      await this.addTable(15);
    } catch (e) {
    }
    try {
      await this.addTable(16);
    } catch (e) {
    }
    try {
      await this.addTable(17);
    } catch (e) {
    }
    try {
      await this.addTable(18);
    } catch (e) {
    }
    try {
      await this.addTable(19);
    } catch (e) {
    }
    try {
      await this.addTable(20);
    } catch (e) {
    }
    try {
      await this.addTable(21);
    } catch (e) {
    }
    try {
      await this.addTable(22);
    } catch (e) {
    }
    try {
      await this.addTable(23);
    } catch (e) {
    }
    try {
      await this.addTable(24);
    } catch (e) {
    }
    try {
      await this.addTable(25);
    } catch (e) {
    }
    try {
      await this.addTable(26);
    } catch (e) {
    }
    try {
      await this.addTable(27);
    } catch (e) {
    }
    try {
      await this.addTable(28);
    } catch (e) {
    }
    try {
      await this.addTable(29);
    } catch (e) {
    }
    try {
      await this.addTable(30);
    } catch (e) {
    }
    try {
      await this.addTable(31);
    } catch (e) {
    }
    try {
      await this.addTable(32);
    } catch (e) {
    }
    try {
      await this.addTable(33);
    } catch (e) {
    }
    try {
      await this.addTable(34);
    } catch (e) {
    }
    try {
      await this.addTable(35);
    } catch (e) {
    }
    try {
      await this.addTable(36);
    } catch (e) {
    }
    try {
      await this.addTable(37);
    } catch (e) {
    }
    try {
      await this.addTable(38);
    } catch (e) {
    }
    try {
      await this.addTable(39);
    } catch (e) {
    }
    try {
      await this.addTable(40);
    } catch (e) {
    }
    try {
      await this.addTable(41);
    } catch (e) {
    }
    try {
      await this.addTable(42);
    } catch (e) {
    }
    try {
      await this.addTable(43);
    } catch (e) {
    }
    try {
      await this.addTable(44);
    } catch (e) {
    }
    try {
      await this.addTable(45);
    } catch (e) {
    }
    try {
      await this.addTable(46);
    } catch (e) {
    }
    try {
      await this.addTable(47);
    } catch (e) {
    }
    try {
      await this.addTable(48);
    } catch (e) {
    }
    try {
      await this.addTable(49);
    } catch (e) {
    }
    try {
      await this.addTable(50);
    } catch (e) {
    }
  }
}
