using Microsoft.EntityFrameworkCore.Migrations;

namespace LibraryManager.Migrations
{
    public partial class editbookentity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "Book",
                newName: "Stock");

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "BookInBill",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "BookInBill");

            migrationBuilder.RenameColumn(
                name: "Stock",
                table: "Book",
                newName: "Quantity");
        }
    }
}
