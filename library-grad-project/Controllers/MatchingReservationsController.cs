using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using LibraryGradProject.Models;
using LibraryGradProject.Repos;
using System.Web.Http;
using System.Web.Http.Cors;

namespace LibraryGradProject.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class MatchingReservationsController : ApiController
    {
        private IRepository<BookReservation> _bookReservationRepo;

        public MatchingReservationsController(IRepository<BookReservation> bookReservationRepository)
        {
            _bookReservationRepo = bookReservationRepository;
        }


        // GET api/<controller>
        public IEnumerable<BookReservation> Get(int id)
        {
            return _bookReservationRepo.GetSpecial(id);
        }

    }
}
