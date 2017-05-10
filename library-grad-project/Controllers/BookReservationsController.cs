using System;
using System.Collections.Generic;
using LibraryGradProject.Models;
using LibraryGradProject.Repos;
using System.Web.Http;
using System.Web.Http.Cors;

namespace LibraryGradProject.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class BookReservationsController : ApiController
    {
        private IRepository<BookReservation> _bookReservationRepo;

        public BookReservationsController(IRepository<BookReservation> bookReservationRepository)
        {
            _bookReservationRepo = bookReservationRepository;
        }

        // GET api/<controller>
        public IEnumerable<BookReservation> Get()
        {
            return _bookReservationRepo.GetAll();
        }

        // GET api/<controller>/5
        public BookReservation Get(int id)
        {
            return _bookReservationRepo.Get(id);
        }

        // POST api/<controller>
        public void Post(BookReservationClientSide request)
        {
            BookReservation newBookReservation = BookReservationRepository.generateReservationFromRequest(request);

            _bookReservationRepo.Add(newBookReservation);
        }

        // PUT api/<controller>/5
        public void Put(BookReservation modifiedBookReservation)
        {
            int id = modifiedBookReservation.BookReservationId;
            _bookReservationRepo.Remove(id);
            _bookReservationRepo.Add(modifiedBookReservation);
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
            _bookReservationRepo.Remove(id);
        }
    }
}