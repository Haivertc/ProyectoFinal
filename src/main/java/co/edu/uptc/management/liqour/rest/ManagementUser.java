package co.edu.uptc.management.liqour.rest;

import java.util.List;
import java.util.Objects;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import co.edu.uptc.management.liqour.dto.UserDTO;
import co.edu.uptc.management.liqour.utils.ManagementListUtils;
import co.edu.uptc.management.persistence.ManagementPersistenceUser;

@Path("/ManagementUser")
public class ManagementUser {
	/* Atributo que determina la instancia para manejar la persistencia de usuarios */
	public static ManagementPersistenceUser managementPersistenceUser = new ManagementPersistenceUser();
	
	/* Atributo que determina la clase utilitaria para operaciones a listas */
	public static ManagementListUtils<UserDTO> managementListUtils;
	
	static {
		/* Hacemos el cargue de la información */
		managementPersistenceUser.loadFilePlain("/data/users.txt");
		
		/* Enviamos la información cargada de los archivos a la clase utilitaria */
		managementListUtils = new ManagementListUtils<UserDTO>(
				managementPersistenceUser.getListUserDTO());
		try {
			/* Asignamos el nombre del atributo por los atributos que deseamos ordenar */
			managementListUtils.sortList("nameUser", "password");
		} catch (NoSuchFieldException | SecurityException | IllegalArgumentException | IllegalAccessException e) {
			System.out.println("No se encontró el nombre del atributo en la clase");
			e.printStackTrace();
		}
	}
	
	@GET
    @Path("/getUsers")
    @Produces({ MediaType.APPLICATION_JSON })
    public List<UserDTO> getUsers() {
        return managementPersistenceUser.getListUserDTO();
    }
	
	@POST
	@Path("/createUser")
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes({ MediaType.APPLICATION_JSON })
	public UserDTO createUser(UserDTO userDTO) {
	    if (managementPersistenceUser.getListUserDTO().add(userDTO)) {
	        managementPersistenceUser.dumpFilePlain("users.txt");
	        return userDTO;
	    }
	    return null;
	}

	@GET
    @Path("/getUserByUsername")
    @Produces({ MediaType.APPLICATION_JSON })
    public UserDTO getUserByUsername(@QueryParam("username") String username) {
        for (UserDTO userDTO : managementPersistenceUser.getListUserDTO()) {
            if (userDTO.getNameUser().equals(username)) {
                return userDTO;
            }
        }
        return null; // Puedes considerar retornar un Response con un status 404 si el usuario no se encuentra
    }
	
	 @DELETE
	    @Path("/deleteUser")
	    @Produces({ MediaType.APPLICATION_JSON })
	    public UserDTO deleteUser(@QueryParam("username") String username) {
	        UserDTO userDTO = this.getUserByUsername(username);
	        if (userDTO != null) {
	            managementPersistenceUser.getListUserDTO().remove(userDTO);
	            managementPersistenceUser.dumpFilePlain("users.txt");
	        }
	        return userDTO;
	    }
	
	@GET
	@Path("/validateUser")
	@Consumes({MediaType.TEXT_PLAIN})
	public Boolean validateUser(@QueryParam("nameUser") String nameUser,
			@QueryParam("password") String password) {
		UserDTO userDTO = new UserDTO(nameUser, password);
		UserDTO usuarioEncontrado = null;
		try {
			usuarioEncontrado = managementListUtils.findObjectBinary(userDTO, "nameUser", "password");
		} catch (NoSuchFieldException | IllegalAccessException e) {
			e.printStackTrace();
		}
		return !Objects.isNull(usuarioEncontrado);
	}
}
