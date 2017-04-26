using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using LibraryGradProject.Models;

namespace LibraryGradProject.Models
{
    public class LibraryContext : DbContext
    {


        public virtual IDbSet<Book> Books { get; set; }
        public virtual IDbSet<BookReservation> BookReservations { get; set; }

        //protected override void OnModelCreating(DbModelBuilder modelBuilder)
        //{
        //    Database.SetInitializer<LibraryContext>(null);
        //    base.OnModelCreating(modelBuilder);
        //}
    }

}