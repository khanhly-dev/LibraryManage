using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.AppEntities.Employees
{
    [Table("Employee")]
    public class EmployeeEntity : Entity<int>
    {
        public string Name { get; set; }
        public DateTime DOB { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime FromDate { get; set; }
        public int OfficeId { get; set; }
        public bool Status { get; set; }
        public int? UserId { get; set; }
    }
}
