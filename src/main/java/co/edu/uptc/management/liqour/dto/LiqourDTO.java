package co.edu.uptc.management.liqour.dto;

public class LiqourDTO {
	private String name;
    private String type;
    private String brand;
    private double alcoholContent;
    private String countryOfOrigin;
    
    public LiqourDTO() {
    }

    public LiqourDTO(String name, String type, String brand, double alcoholContent, String countryOfOrigin) {
        this.name = name;
        this.type = type;
        this.brand = brand;
        this.alcoholContent = alcoholContent;
        this.countryOfOrigin = countryOfOrigin;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public double getAlcoholContent() {
        return alcoholContent;
    }

    public void setAlcoholContent(double alcoholContent) {
        this.alcoholContent = alcoholContent;
    }

    public String getCountryOfOrigin() {
        return countryOfOrigin;
    }

    public void setCountryOfOrigin(String countryOfOrigin) {
        this.countryOfOrigin = countryOfOrigin;
    }

    @Override
    public String toString() {
        return "Liquor [name=" + name + ", type=" + type + ", brand=" + brand + ", alcoholContent=" + alcoholContent
                + ", countryOfOrigin=" + countryOfOrigin + "]";
    }
}
