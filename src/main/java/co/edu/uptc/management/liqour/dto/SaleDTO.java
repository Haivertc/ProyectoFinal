package co.edu.uptc.management.liqour.dto;

public class SaleDTO {
	private String saleDate;
    private int quantitySold;
    private double unitPrice;
    private String customerName;
    private String liqourName;
    
    public SaleDTO() {
	}

	public SaleDTO(String saleDate, int quantitySold, double unitPrice, String customerName, String liquorName) {
        this.saleDate = saleDate;
        this.quantitySold = quantitySold;
        this.unitPrice = unitPrice;
        this.customerName = customerName;
        this.liqourName = liquorName;
    }
    
    public String getSaleDate() {
		return saleDate;
	}

	public void setSaleDate(String saleDate) {
		this.saleDate = saleDate;
	}

	public int getQuantitySold() {
        return quantitySold;
    }

    public void setQuantitySold(int quantitySold) {
        this.quantitySold = quantitySold;
    }

    public double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getLiqourName() {
        return liqourName;
    }

    public void setLiqourName(String liqourName) {
        this.liqourName = liqourName;
    }
    
    @Override
    public String toString() {
        return "Sale{" +
                "saleDate=" + saleDate +
                ", quantitySold=" + quantitySold +
                ", unitPrice=" + unitPrice +
                ", customerName='" + customerName + '\'' +
                ", liqourName='" + liqourName + '\'' +
                '}';
    }
}
