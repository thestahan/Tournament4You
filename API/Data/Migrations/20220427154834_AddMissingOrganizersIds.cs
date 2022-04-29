using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    public partial class AddMissingOrganizersIds : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tournaments_AspNetUsers_OrganizerId",
                table: "Tournaments");

            migrationBuilder.AlterColumn<string>(
                name: "OrganizerId",
                table: "Tournaments",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OrganizerId",
                table: "Teams",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Teams_OrganizerId",
                table: "Teams",
                column: "OrganizerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Teams_AspNetUsers_OrganizerId",
                table: "Teams",
                column: "OrganizerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tournaments_AspNetUsers_OrganizerId",
                table: "Tournaments",
                column: "OrganizerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Teams_AspNetUsers_OrganizerId",
                table: "Teams");

            migrationBuilder.DropForeignKey(
                name: "FK_Tournaments_AspNetUsers_OrganizerId",
                table: "Tournaments");

            migrationBuilder.DropIndex(
                name: "IX_Teams_OrganizerId",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "OrganizerId",
                table: "Teams");

            migrationBuilder.AlterColumn<string>(
                name: "OrganizerId",
                table: "Tournaments",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddForeignKey(
                name: "FK_Tournaments_AspNetUsers_OrganizerId",
                table: "Tournaments",
                column: "OrganizerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
