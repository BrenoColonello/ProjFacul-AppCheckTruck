using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace transportadores.infra.Migrations
{
    /// <inheritdoc />
    public partial class MudadoParaClasseTipoPeca : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Tipo",
                table: "Peca",
                newName: "TipoId");

            migrationBuilder.CreateTable(
                name: "TipoPeca",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nome = table.Column<string>(type: "text", nullable: false),
                    KilometragemRevisao = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TipoPeca", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Peca_TipoId",
                table: "Peca",
                column: "TipoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Peca_TipoPeca_TipoId",
                table: "Peca",
                column: "TipoId",
                principalTable: "TipoPeca",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Peca_TipoPeca_TipoId",
                table: "Peca");

            migrationBuilder.DropTable(
                name: "TipoPeca");

            migrationBuilder.DropIndex(
                name: "IX_Peca_TipoId",
                table: "Peca");

            migrationBuilder.RenameColumn(
                name: "TipoId",
                table: "Peca",
                newName: "Tipo");
        }
    }
}
