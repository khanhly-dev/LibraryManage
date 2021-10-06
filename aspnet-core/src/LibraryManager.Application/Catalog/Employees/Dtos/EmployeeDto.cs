using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.Catalog.Employees.Dtos
{
    public class EmployeeDto : EntityDto<int>
    {
        public string Name { get; set; }
        public DateTime DOB { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime FromDate { get; set; }
        public int OfficeId { get; set; }
        public string OfficeName { get; set; }
        public bool Status { get; set; }
        public int? UserId { get; set; }
    }
}
