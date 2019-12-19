using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Farmdeck_API.Migrations
{
    public partial class AddAccountAndDeck2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "Token",
                table: "Deck",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Token",
                table: "Deck");
        }
    }
}
