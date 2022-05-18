const validateForm = (inputs, type) => {
  let errors = {};

  if (type === "Usuarios" || type === "Clases" || type === "Instructores") {
    if (!inputs.name) {
      errors.name = "El nombre es requerido";
    }
    if (!inputs.image) {
      errors.image = "La imagen es requerida";
    }
  }

  if (type === "Usuarios") {
    // if (!inputs.lastName) {
    //   errors.lastName = "El apellido es requerido";
    // }
    // if (!inputs.email) {
    //   errors.email = "El email es requerido";
    // }
    // if (!inputs.phoneNumber) {
    //   errors.phoneNumber = "El número de teléfono es requerido";
    // }
    if (!inputs.isAdmin) {
      errors.isAdmin = "¿Será administrador?";
    }
    // if (!inputs.notifications) {
    //   errors.notifications = "¿Quiere activar las notificaciones?";
    // }
    // if (!inputs.activities.length) {
    //   errors.activities = "Debes mandar al menos una actividad";
    // }
  }

  if (type === "Clases") {
    if (!inputs.name) {
      errors.name = "El nombre es requerido";
    }
    if (!inputs.video) {
      errors.video = "El video es requerido";
    }
    if (!inputs.description) {
      errors.description = "La descripcion es requerida";
    }
    if (!inputs.price) {
      errors.price = "El precio es requerido";
    }
    if (!inputs.trainers.length) {
      errors.trainers = "Debe seleccionar instructor";
    }
    if (!inputs.diaHoras.length) {
      errors.diaHoras = "Debe seleccionar dia y hora";
    }
  }

  if (type === "Instructores") {
    if (!inputs.specialty) {
      errors.specialty = "La especialidad se requiere";
    }
    if (!inputs.experience) {
      errors.experience = "La experiencia es requerida";
    }
    if (!inputs.activities.length) {
      errors.activities =
        "Debes seleccionar al menos una actividad para el trainer";
    }
  }

  if (type === "Dias y horas") {
    if (!inputs.day) {
      errors.day = "Debes especificar un día";
    }
    if (!inputs.hour) {
      errors.hour = "El horario es obligatorio";
    } else if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/g.test(inputs.hour)) {
      errors.hour = "El formato debe ser el siguiente: HH:MM o H:MM";
    }
    if (!inputs.capacity) {
      errors.capacity = "La capacidad es obligatoria";
    } /* else if (inputs.capacity.includes(",") || inputs.capacity.includes(".")) {
      errors.capacity = "Solo numeros enteros";
    } */
  }
  if (type === "Descuentos") {
    if (!inputs.descuento) {
      errors.descuento = "Debes indicar un descuento";
    } else if (inputs.descuento[0] === "0") {
      errors.descuento = "Este descuento no es posible";
    } else if (!/^[0-9]+$/g.test(inputs.descuento)) {
      errors.descuento = "Solo números";
    } else if (inputs.descuento > 100) {
      errors.descuento = "No puedes crear un descuento mayor al 100%";
    }
    if (!inputs.codigo) {
      errors.codigo = "Debe incluir un codigo";
    }
  }
  return errors;
};

export { validateForm };
