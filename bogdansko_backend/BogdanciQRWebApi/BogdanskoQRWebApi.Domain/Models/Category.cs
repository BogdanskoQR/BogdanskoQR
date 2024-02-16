namespace BogdanskoQRWebApi.Domain.Models
{
    public class Category : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string BackgroundImage { get; set; } = string.Empty;
        public string? View { get; set; } = string.Empty;
        public Company Company { get; set; }
        public int CompanyId { get; set; }
        public List<Drink> Drinks { get; set; }
    }
}