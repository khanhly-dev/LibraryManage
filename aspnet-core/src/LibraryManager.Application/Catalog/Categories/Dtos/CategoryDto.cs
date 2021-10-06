using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.Catalog.Categories.Requests
{
    public class CategoryDto : EntityDto<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
