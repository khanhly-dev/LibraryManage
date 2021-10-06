using System.ComponentModel.DataAnnotations;

namespace LibraryManager.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}