using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.Catalog.Employees.Requests
{
    public class CreateOrUpdateEmployeeRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime DOB { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime FromDate { get; set; }
        public int OfficeId { get; set; }
        public bool Status { get; set; }
        public int? UserId { get; set; }
    }
}
