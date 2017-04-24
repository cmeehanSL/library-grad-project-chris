using LibraryGradProject.Models;
using System.Collections.Generic;
using System.Linq;

namespace LibraryGradProject.Repos
{
    public class BookRepository : IRepository<Book>
    {
        public void Add(Book entity)
        {
            System.Diagnostics.Debug.WriteLine("adding entity");
            using (var context = new LibraryContext())
            {
                context.Books.Add(entity);
                context.SaveChanges();

                return;
            }
        }

        public IEnumerable<Book> GetAll()
        {
            System.Diagnostics.Debug.WriteLine("hello");

            using (var context = new LibraryContext())
            {
                System.Diagnostics.Debug.WriteLine("hi");
                //var firstAuthor = context.Books.Find(1);
                //System.Diagnostics.Debug.WriteLine(firstAuthor.Author);

                return context.Books.ToList();
            }
        }

        public Book Get(int id)
        {
            using (var context = new LibraryContext())
            {
                var entity = context.Books.Find(id);

                return entity;
            }
        }

        public void Remove(int id)
        {
            using (var context = new LibraryContext())
            {
                Book bookToRemove = context.Books.Find(id);
                context.Books.Remove(bookToRemove);

                context.SaveChanges();
            }
        }

    }
}