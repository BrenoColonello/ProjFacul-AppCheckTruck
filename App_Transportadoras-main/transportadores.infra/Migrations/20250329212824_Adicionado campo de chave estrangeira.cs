using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace transportadores.infra.Migrations
{
    /// <inheritdoc />
    public partial class Adicionadocampodechaveestrangeira : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Peca_TipoPeca_TipoId",
                table: "Peca");

            migrationBuilder.RenameColumn(
                name: "TipoId",
                table: "Peca",
                newName: "TipoPecaId");

            migrationBuilder.RenameIndex(
                name: "IX_Peca_TipoId",
                table: "Peca",
                newName: "IX_Peca_TipoPecaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Peca_TipoPeca_TipoPecaId",
                table: "Peca",
                column: "TipoPecaId",
                principalTable: "TipoPeca",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Peca_TipoPeca_TipoPecaId",
                table: "Peca");

            migrationBuilder.RenameColumn(
                name: "TipoPecaId",
                table: "Peca",
                newName: "TipoId");

            migrationBuilder.RenameIndex(
                name: "IX_Peca_TipoPecaId",
                table: "Peca",
                newName: "IX_Peca_TipoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Peca_TipoPeca_TipoId",
                table: "Peca",
                column: "TipoId",
                principalTable: "TipoPeca",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
