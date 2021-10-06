using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using LibraryManager.Authorization.Roles;
using LibraryManager.Authorization.Users;
using LibraryManager.MultiTenancy;
using LibraryManager.AppEntities.Books;
using LibraryManager.AppEntities.Categories;
using LibraryManager.AppEntities.Bills;
using LibraryManager.AppEntities.Customers;
using LibraryManager.AppEntities.Employees;
using LibraryManager.AppEntities.Offices;
using LibraryManager.AppEntities.BookInBills;

namespace LibraryManager.EntityFrameworkCore
{
    public class LibraryManagerDbContext : AbpZeroDbContext<Tenant, Role, User, LibraryManagerDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<BookEntity> Books { get; set; }
        public DbSet<CategoryEntity> Categories { get; set; }
        public DbSet<BillEntity> Bills { get; set; }
        public DbSet<CustomerEntity> Customers { get; set; }
        public DbSet<EmployeeEntity> Employees { get; set; }
        public DbSet<OfficeEntity> Offices { get; set; }
        public DbSet<BookInBillEntity> BookInBills { get; set; }

        public LibraryManagerDbContext(DbContextOptions<LibraryManagerDbContext> options)
            : base(options)
        {
        }
    }
}
