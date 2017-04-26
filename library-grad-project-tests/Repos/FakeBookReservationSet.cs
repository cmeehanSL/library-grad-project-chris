using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibraryGradProject.Models;
using FakeDbSet;

namespace LibraryGradProjectTests.Repos
{
    public class FakeBookReservationSet : FakeDbSet.InMemoryDbSet<BookReservation>
    {
        public override BookReservation Find(params object[] keyValues)
        {
            return this.SingleOrDefault(b => b.BookReservationId == (int)keyValues.Single());
        }
    }
}
