using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using LibraryGradProject.Models;
using System.Globalization;

namespace LibraryGradProject.Repos
{
    public class BookReservationRepository : IRepository<BookReservation>
    {

        public static BookReservation generateReservationFromRequest(BookReservationClientSide request)
        {
            BookReservation newBookReservation = new BookReservation();
            newBookReservation.Book = request.Book;
            newBookReservation.Time = DateTime.ParseExact(request.Time, "dd/MM/yyyy HH:mm:ss", CultureInfo.InvariantCulture);

            return newBookReservation;
        }

        //private List<BookReservation> _bookReservationCollection = new List<BookReservation>();

        public void Add(BookReservation entity)
        {
            System.Diagnostics.Debug.WriteLine("adding book res entity");
            System.Diagnostics.Debug.WriteLine(entity.Book);
            System.Diagnostics.Debug.WriteLine(entity.Time);

            var book = entity.Book;




            using (var context = new LibraryContext())
            {
                // Check if there are any other reservations that clash
                var matchingBooks = context.BookReservations
                    .Where(res => res.Id == book).ToList();

                foreach (BookReservation res in matchingBooks)
                {
                    System.Diagnostics.Debug.WriteLine("Reservation found for same Book on the following date: " + res.Time);

                    double daysDifference = Math.Abs((res.Time - entity.Time).TotalDays);

                    System.Diagnostics.Debug.WriteLine("Days difference between reservations is:" + daysDifference);

                    if (daysDifference <= 14)
                    {
                        System.Diagnostics.Debug.WriteLine("Cannot create reservation as would clash with existing one");
                        return;
                    }
                }


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