using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BogdanskoQRWebApi.DataAccess.Migrations
{
    public partial class ImgForCompanyAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CompanyLogo",
                table: "Companies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompanyLogo",
                table: "Companies");
        }
    }
}
