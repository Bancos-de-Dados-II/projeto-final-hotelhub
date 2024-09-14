import { Table, Column, Model, PrimaryKey, Unique, NotNull } from 'sequelize-typescript';

@Table({
  tableName: 'usuarios'
})
class Usuario extends Model<Usuario> {
  
  @PrimaryKey
  @Column
  cpf!: string;

  @Unique
  @Column
  email!: string;

  @Column
  nome!: string;

  @Column
  telefone!: string;
}

export default Usuario;
