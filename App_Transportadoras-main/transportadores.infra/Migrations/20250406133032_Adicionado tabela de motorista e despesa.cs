using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace transportadores.infra.Migrations
{
    /// <inheritdoc />
    public partial class Adicionadotabelademotoristaedespesa : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Peca_TipoPeca_TipoPecaId",
                table: "Peca");

            migrationBuilder.AddColumn<int>(
                name: "MotoristaId",
                table: "Veiculo",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Motorista",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nome = table.Column<string>(type: "text", nullable: false),
                    DataContratacao = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Cnh = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Motorista", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Despesa",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Descricao = table.Column<string>(type: "text", nullable: false),
                    ValorDespesa = table.Column<decimal>(type: "numeric", nullable: false),
                    MotoristaId = table.Column<int>(type: "integer", nullable: false),
                    VeiculoId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Despesa", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Despesa_Motorista_MotoristaId",
                        column: x => x.MotoristaId,
                        principalTable: "Motorista",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Despesa_Veiculo_VeiculoId",
                        column: x => x.VeiculoId,
                        principalTable: "Veiculo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Veiculo_MotoristaId",
                table: "Veiculo",
                column: "MotoristaId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Despesa_MotoristaId",
                table: "Despesa",
                column: "MotoristaId");

            migrationBuilder.CreateIndex(
                name: "IX_Despesa_VeiculoId",
                table: "Despesa",
                column: "VeiculoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Peca_TipoPeca_TipoPecaId",
                table: "Peca",
                column: "TipoPecaId",
                principalTable: "TipoPeca",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Veiculo_Motorista_MotoristaId",
                table: "Veiculo",
                column: "MotoristaId",
                principalTable: "Motorista",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Peca_TipoPeca_TipoPecaId",
                table: "Peca");

            migrationBuilder.DropForeignKey(
                name: "FK_Veiculo_Motorista_MotoristaId",
                table: "Veiculo");

            migrationBuilder.DropTable(
                name: "Despesa");

            migrationBuilder.DropTable(
                name: "Motorista");

            migrationBuilder.DropIndex(
                name: "IX_Veiculo_MotoristaId",
                table: "Veiculo");

            migrationBuilder.DropColumn(
                name: "MotoristaId",
                table: "Veiculo");

            migrationBuilder.AddForeignKey(
                name: "FK_Peca_TipoPeca_TipoPecaId",
                table: "Peca",
                column: "TipoPecaId",
                principalTable: "TipoPeca",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
