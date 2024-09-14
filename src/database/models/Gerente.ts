import { Table, Column, Model, PrimaryKey, Unique, NotNull } from 'sequelize-typescript';
import Usuario from './Usuario';
import sequelize from '../database';

@Table({
  tableName: 'gerentes'
})
class Gerente extends Usuario {
    @Column
    nivelGerencial!: string;
}