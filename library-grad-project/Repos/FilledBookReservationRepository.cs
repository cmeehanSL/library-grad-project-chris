using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using LibraryGradProject.Models;


namespace LibraryGradProject.Repos
{
    public class FilledBookReservationRepository : IRepository<BookReservation>
    {
        private List<BookReservation> _bookReservationCollection = new List<BookReservation>();

        //public FilledBookReservationRepository()
        //{
        //    Add(new BookReservation { Book = 0, Time = new DateTime(2017, 5, 2) });
        //}

        public void Add(BookReservation entity)
        {
            entity.Id = _bookReservationCollection.Count;
            _bookReservationCollection.Add(entity);
        }

        public IEnumerable<BookReservation> GetAll()
        {
            return _bookReservationCollection;
        }

        public BookReservation Get(int id)
        {
            return _bookReservationCollection.Where(res => res.Id == id).SingleOrDefault();
        }

        public void Remove(int id)
        {
            BookReservation bookReservationToRemove = Get(id);
            _bookReservationCollection.Remove(bookReservationToRemove);
        }

        private IEnumerable<BookReservation> getReservationsForBook(int bookId)
        {
            return _bookReservationCollection.Where(res => res.Book == bookId);
        }
    }
}