using System;
using LibraryGradProject.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LibraryGradProject.Repos
{
    public class FilledBookRepository : IRepository<Book>
    {
        //private List<Book> _filledBookCollection = new List<Book>();

        public FilledBookRepository()
        {
            //Add(new Book { Title = "American Psycho", ISBN = "9781613470190", Author = "Brett Easton Ellis", PublishDate = "1991" });
            //Add(new Book { Title = "Name of the Wind", ISBN = "9788580410631", Author = "Patrick Rothfuss", PublishDate = "2007" });

            //using (var context = new LibraryContext())
            //{
            //    System.Diagnostics.Debug.WriteLine("hi");
            //    var array = context.Books.SqlQuery("SELECT * FROM BOOKS").ToList();
            //    var first = array[0].Author;
            //    System.Diagnostics.Debug.WriteLine(array);
            //    System.Diagnostics.Debug.WriteLine(first);

            //}
        }

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
                var firstAuthor = context.Books.Find(1);
                System.Diagnostics.Debug.WriteLine(firstAuthor.Author);

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