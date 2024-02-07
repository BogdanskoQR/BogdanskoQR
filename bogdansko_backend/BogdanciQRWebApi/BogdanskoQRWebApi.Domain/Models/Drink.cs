namespace BogdanskoQRWebApi.Domain.Models
{
    public class Drink : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public double Price { get; set; }
        public string? Image { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public Category Category { get; set; }
        public int CategoryId { get; set; }
    }
}
