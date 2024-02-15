using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BogdanskoQRWebApi.DataAccess.Migrations
{
    public partial class ViewAddedInCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "View",
                table: "Categories",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "View",
                table: "Categories");
        }
    }
}
