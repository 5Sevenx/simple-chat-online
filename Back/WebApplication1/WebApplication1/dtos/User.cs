using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.dtos
{
    [Table("ChatTable")]
    public class User
    {
        public int? Id { get; set; }
        public string NickName { set; get; }
        public string Passwd { set; get; }
    }
}
