using LibraryGradProject.Models;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;

namespace LibraryGradProject.Repos
{
    public class BookRepository : IRepository<Book>
    {
        private readonly IDbContextFactory<LibraryContext> _contextFactory;

        public BookRepository(IDbContextFactory<LibraryContext> contextFactory)
        {
            this._contextFactory = contextFactory;
        }
    

        //public BookRepository()
        //{
        //    LibraryContextFactory contextFactory = new LibraryContextFactory();
        //    _context = contextFactory.Create();
        //}

        public void Add(Book entity)
        {
            System.Diagnostics.Debug.WriteLine("adding entity");
            using (var context = _contextFactory.Create())
            {
                context.Books.Add(entity);
                context.SaveChanges();

                return;
            }
        }

        public IEnumerable<Book> GetAll()
        {
            System.Diagnostics.Debug.WriteLine("hello");

            using (var context = _contextFactory.Create())
            {
                System.Diagnostics.Debug.WriteLine("hi");
                //var firstAuthor = _context.Books.Find(1);
                //System.Diagnostics.Debug.WriteLine(firstAuthor.Author);

                return context.Books.ToList();
            }
        }

        public Book Get(int id)
        {
            using (var context = _contextFactory.Create())
            {
                var entity = context.Books.Find(id);

                return entity;
            }
        }

        public void Remove(int id)
        {
            using (var context = _contextFactory.Create())
            {
                Book bookToRemove = context.Books.Find(id);
                context.Books.Remove(bookToRemove);

                context.SaveChanges();
            }
        }

    }
}