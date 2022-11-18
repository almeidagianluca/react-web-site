using Microsoft.EntityFrameworkCore;
using ProjetoEscola_API.Models;
using System.Diagnostics.CodeAnalysis;
namespace ProjetoEscola_API.Data
{
    public class MovieContext : DbContext
    {
        protected readonly IConfiguration Configuration;
        public MovieContext(IConfiguration configuration)
            {
            Configuration = configuration;
            }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
            {
            // connect to sql server with connection string from app settings
            options.UseSqlServer(Configuration.GetConnectionString("StringConexaoSQLServer"));
            }
        public DbSet<Movie>? Movie { get; set; }
        public DbSet<User>? Usuario { get; set; }
    }
}