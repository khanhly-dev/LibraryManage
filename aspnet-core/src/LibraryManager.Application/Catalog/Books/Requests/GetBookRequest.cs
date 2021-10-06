using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.Catalog.Books.Requests
{
    public class GetBookRequest
    {
        public string Keyword { get; set; }
    }
}
