using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.Catalog.Offices.Dtos
{
    public class OfficeDto : EntityDto<int>
    {
        public string Name { get; set; }
        public string Descripton { get; set; }
    }
}
