using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using LibraryGradProject.Models;
using System.Globalization;
using System.Data.Entity.Infrastructure;

namespace LibraryGradProject.Repos
{
    public class BookReservationRepository : IRepository<BookReservation>
    {
        private readonly IDbContextFactory<LibraryContext> _contextFactory;

        public BookReservationRepository(IDbContextFactory<LibraryContext> contextFactory)
        {
            this._contextFactory = contextFactory;
        }
        public static BookReservation generateReservationFromRequest(BookReservationClientSide request)
        {
            BookReservation newBookReservation = new BookReservation();
            newBookReservation.BookId = request.BookId;
            newBookReservation.ReservationLength = request.ReservationLength;
            newBookReservation.Date = DateTime.ParseExact(request.Date, "dd/MM/yyyy", CultureInfo.InvariantCulture);

            return newBookReservation;
        }

        //private List<BookReservation> _bookReservationCollection = new List<BookReservation>();

        public void Add(BookReservation entity)
        {
            System.Diagnostics.Debug.WriteLine("adding book res entity");
            System.Diagnostics.Debug.WriteLine(entity.BookId);
            System.Diagnostics.Debug.WriteLine(entity.Date);

            var book = entity.BookId;

            using (var context = _contextFactory.Create())
            {
                // Check if there are any other reservations that clash
                var matchingBooks = context.BookReservations
                    .Where(res => res.BookId == book).ToList();

                foreach (BookReservation res in matchingBooks)
                {
                    System.Diagnostics.Debug.WriteLine("Reservation found for same Book on the following date: " + res.Date);

                    double daysDifference = Math.Abs((res.Date - entity.Date).TotalDays);

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
            using (var context = _contextFactory.Create())
            {
                return context.BookReservations.ToList();
            }
        }

        public BookReservation Get(int id)
        {
            using (var context = _contextFactory.Create())
            {
                var entity = context.BookReservations.Find(id);

                return entity;
            }
        }

        public void Remove(int id)
        {
            using (var context = _contextFactory.Create())
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