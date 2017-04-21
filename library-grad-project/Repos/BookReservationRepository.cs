using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using LibraryGradProject.Models;


namespace LibraryGradProject.Repos
{
    public class BookReservationRepository : IRepository<BookReservation>
    {
        //private List<BookReservation> _bookReservationCollection = new List<BookReservation>();

        public void Add(BookReservation entity)
        {
            System.Diagnostics.Debug.WriteLine("adding book res entity");
            System.Diagnostics.Debug.WriteLine(entity.Time);


            using (var context = new LibraryContext())
            {
                context.BookReservations.fi

                context.BookReservations.Add(entity);
                context.SaveChanges();

                return;
            }


            //entity.Id = _bookReservationCollection.Count;
            //_bookReservationCollection.Add(entity);
        }

        public IEnumerable<BookReservation> GetAll()
        {
            using (var context = new LibraryContext())
            {
                return context.BookReservations.ToList();
            }
        }

        public BookReservation Get(int id)
        {
            using (var context = new LibraryContext())
            {
                var entity = context.BookReservations.Find(id);

                return entity;
            }
        }

        public void Remove(int id)
        {
            using (var context = new LibraryContext())
            {
                BookReservation reservationToRemove = context.BookReservations.Find(id);
                context.BookReservations.Remove(reservationToRemove);
                context.SaveChanges();
            }
        }

        //private IEnumerable<BookReservation> getReservationsForBook(int bookId)
        //{
        //    return _bookReservationCollection.Where(res => res.Book == bookId);
        //}
    }
}