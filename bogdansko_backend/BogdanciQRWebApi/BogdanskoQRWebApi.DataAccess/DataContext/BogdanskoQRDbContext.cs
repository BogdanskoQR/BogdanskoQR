namespace BogdanskoQRWebApi.DataAccess.DataContext
{
    using BogdanskoQRWebApi.Domain.Models;
    using Microsoft.EntityFrameworkCore;
    public class BogdanskoQRDbContext : DbContext
    {
        public BogdanskoQRDbContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<Company> Companies { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Drink> Drinks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Company>()
                .HasMany(x => x.Categories)
                .WithOne(x => x.Company)
                .HasForeignKey(x => x.CompanyId);

            modelBuilder.Entity<Category>()
                .HasMany(x => x.Drinks)
                .WithOne(x => x.Category)
                .HasForeignKey(x => x.CategoryId);

            modelBuilder.Entity<Category>()
                .Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Drink>()
                .Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(100);
        }
    }
}
