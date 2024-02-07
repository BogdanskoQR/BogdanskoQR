using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BogdanskoQRWebApi.DataAccess.Migrations
{
    public partial class NameAndMenuColorAdde : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MenuThemeColor",
                table: "Companies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Companies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MenuThemeColor",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Companies");
        }
    }
}
