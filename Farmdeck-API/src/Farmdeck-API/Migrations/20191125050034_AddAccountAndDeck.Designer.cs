﻿// <auto-generated />
using System;
using Farmdeck_API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Farmdeck_API.Migrations
{
    [DbContext(typeof(FarmdeckDbContext))]
    [Migration("20191125050034_AddAccountAndDeck")]
    partial class AddAccountAndDeck
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("Farmdeck_API.Data.Entities.Account", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("DateUpdated")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("ID");

                    b.HasIndex("Username")
                        .IsUnique();

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("Farmdeck_API.Data.Entities.Deck", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("AccountID")
                        .HasColumnType("integer");

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("DateUpdated")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("ID");

                    b.HasIndex("AccountID");

                    b.ToTable("Deck");
                });

            modelBuilder.Entity("Farmdeck_API.Data.Entities.Indicator", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("DateUpdated")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("DeckID")
                        .HasColumnType("integer");

                    b.Property<byte>("Type")
                        .HasColumnType("smallint");

                    b.Property<float>("Value")
                        .HasColumnType("real");

                    b.HasKey("ID");

                    b.HasIndex("DeckID");

                    b.ToTable("Indicators");
                });

            modelBuilder.Entity("Farmdeck_API.Data.Entities.Deck", b =>
                {
                    b.HasOne("Farmdeck_API.Data.Entities.Account", "Account")
                        .WithMany("Decks")
                        .HasForeignKey("AccountID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Farmdeck_API.Data.Entities.Indicator", b =>
                {
                    b.HasOne("Farmdeck_API.Data.Entities.Deck", "Deck")
                        .WithMany("Indicators")
                        .HasForeignKey("DeckID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
