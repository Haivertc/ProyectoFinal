package co.edu.uptc.management.liqour.rest;

import java.util.List;
import java.util.Objects;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import co.edu.uptc.management.liqour.dto.LiqourDTO;
import co.edu.uptc.management.persistence.ManagementPersistenceLiqour;

@Path("/ManagementLiqour")	
public class ManagementLiqour {

	public static ManagementPersistenceLiqour managementPersistenceLiqour = new ManagementPersistenceLiqour();

    static {
        managementPersistenceLiqour.loadFilePlain("/data/liqours.txt");
    }

    @GET
    @Path("/getLiqours")
    @Produces({ MediaType.APPLICATION_JSON })
    public List<LiqourDTO> getLiqours() {
        return managementPersistenceLiqour.getListLiqoursDTO();
    }

    @GET
    @Path("/getLiqourByName")
    @Produces({ MediaType.APPLICATION_JSON })
    public LiqourDTO getLiqourByName(@QueryParam("nameLiqour") String nameLiqour) {
        for (LiqourDTO liqourDTO : managementPersistenceLiqour.getListLiqoursDTO()) {
            if (liqourDTO.getName().equals(nameLiqour)) {
                return liqourDTO;
            }
        }
        return null;
    }

    @POST
    @Path("/createLiqour")
    @Produces({ MediaType.APPLICATION_JSON })
    @Consumes({ MediaType.APPLICATION_JSON })
    public LiqourDTO createLiqour(LiqourDTO liqourDTO) {
        if (managementPersistenceLiqour.getListLiqoursDTO().add(liqourDTO)) {
            managementPersistenceLiqour.dumpFilePlain("liqours.txt");
            return liqourDTO;
        }
        return null;
    }

    @PUT
    @Path("/updateLiqour")
    @Produces({ MediaType.APPLICATION_JSON })
    @Consumes({ MediaType.APPLICATION_JSON })
    public LiqourDTO updateLiqour(LiqourDTO liqourDTO) {
        for (LiqourDTO liqour : managementPersistenceLiqour.getListLiqoursDTO()) {
            if (liqour.getName().equals(liqourDTO.getName())) {
                liqour.setName(liqourDTO.getName());
                liqour.setType(liqourDTO.getType());
                liqour.setBrand(liqourDTO.getBrand());
                liqour.setAlcoholContent(liqourDTO.getAlcoholContent());
                liqour.setCountryOfOrigin(liqourDTO.getCountryOfOrigin());
                managementPersistenceLiqour.dumpFilePlain("liqours.txt");
                return liqourDTO;
            }
        }
        return null;
    }

    @PUT
    @Path("/updateLiqourAttribute")
    @Produces({ MediaType.APPLICATION_JSON })
    @Consumes({ MediaType.APPLICATION_JSON })
    public LiqourDTO updateLiqourAttribute(LiqourDTO liqourDTO) {
        for (LiqourDTO liqour : managementPersistenceLiqour.getListLiqoursDTO()) {
            if (liqour.getName().equals(liqourDTO.getName())) {
                if (!Objects.isNull(liqourDTO.getType())) {
                    liqour.setType(liqourDTO.getType());
                }

                if (!Objects.isNull(liqourDTO.getBrand())) {
                    liqour.setBrand(liqourDTO.getBrand());
                }

                if (!Objects.isNull(liqourDTO.getAlcoholContent())) {
                    liqour.setAlcoholContent(liqourDTO.getAlcoholContent());
                }

                if (!Objects.isNull(liqourDTO.getCountryOfOrigin())) {
                    liqour.setCountryOfOrigin(liqourDTO.getCountryOfOrigin());
                }
                managementPersistenceLiqour.dumpFilePlain("liqours.txt");
                return liqourDTO;
            }
        }
        return null;
    }

    @DELETE
    @Path("/deleteLiqour")
    @Produces({ MediaType.APPLICATION_JSON })
    @Consumes({ MediaType.APPLICATION_JSON })
    public LiqourDTO deleteLiqour(@QueryParam("nameLiqour") String nameLiqour) {
        LiqourDTO liqourDTO = this.getLiqourByName(nameLiqour);
        if (liqourDTO != null) {
            managementPersistenceLiqour.getListLiqoursDTO().remove(liqourDTO);
            managementPersistenceLiqour.dumpFilePlain("liqours.txt");
        }
        return liqourDTO;
    }
}
