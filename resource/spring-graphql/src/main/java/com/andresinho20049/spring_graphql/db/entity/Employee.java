package com.andresinho20049.spring_graphql.db.entity;

import java.time.LocalDate;
import java.util.Objects;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Table(name = "employee")
public class Employee {

    @Id
    private Long id;

    private LocalDate createdAt;

    @LastModifiedDate
    private LocalDate updatedAt;

    @LastModifiedBy
    private String updatedUsername;

    private String name;

    @Column("birth_date")
	@JsonSerialize(as = LocalDate.class)
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
    private LocalDate birthDate;

    private Long positionId;

    private LocalDate hireDate;

    private LocalDate terminationDate;

    private String note;

    private Long companyId;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDate createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDate getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDate updatedAt) {
		this.updatedAt = updatedAt;
	}

	public String getUpdatedUsername() {
		return updatedUsername;
	}

	public void setUpdatedUsername(String updatedUsername) {
		this.updatedUsername = updatedUsername;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public LocalDate getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(LocalDate birthDate) {
		this.birthDate = birthDate;
	}

	public Long getPositionId() {
		return positionId;
	}

	public void setPositionId(Long positionId) {
		this.positionId = positionId;
	}

	public LocalDate getHireDate() {
		return hireDate;
	}

	public void setHireDate(LocalDate hireDate) {
		this.hireDate = hireDate;
	}

	public LocalDate getTerminationDate() {
		return terminationDate;
	}

	public void setTerminationDate(LocalDate terminationDate) {
		this.terminationDate = terminationDate;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public Long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}

	@Override
	public int hashCode() {
		return Objects.hash(birthDate, companyId, createdAt, hireDate, id, name, note, positionId, terminationDate,
				updatedAt, updatedUsername);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Employee other = (Employee) obj;
		return Objects.equals(birthDate, other.birthDate) && Objects.equals(companyId, other.companyId)
				&& Objects.equals(createdAt, other.createdAt) && Objects.equals(hireDate, other.hireDate)
				&& Objects.equals(id, other.id) && Objects.equals(name, other.name) && Objects.equals(note, other.note)
				&& Objects.equals(positionId, other.positionId)
				&& Objects.equals(terminationDate, other.terminationDate) && Objects.equals(updatedAt, other.updatedAt)
				&& Objects.equals(updatedUsername, other.updatedUsername);
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Employee [");
		if (id != null) {
			builder.append("id=");
			builder.append(id);
			builder.append(", ");
		}
		if (createdAt != null) {
			builder.append("createdAt=");
			builder.append(createdAt);
			builder.append(", ");
		}
		if (updatedAt != null) {
			builder.append("updatedAt=");
			builder.append(updatedAt);
			builder.append(", ");
		}
		if (updatedUsername != null) {
			builder.append("updatedUsername=");
			builder.append(updatedUsername);
			builder.append(", ");
		}
		if (name != null) {
			builder.append("name=");
			builder.append(name);
			builder.append(", ");
		}
		if (birthDate != null) {
			builder.append("birthDate=");
			builder.append(birthDate);
			builder.append(", ");
		}
		if (positionId != null) {
			builder.append("positionId=");
			builder.append(positionId);
			builder.append(", ");
		}
		if (hireDate != null) {
			builder.append("hireDate=");
			builder.append(hireDate);
			builder.append(", ");
		}
		if (terminationDate != null) {
			builder.append("terminationDate=");
			builder.append(terminationDate);
			builder.append(", ");
		}
		if (note != null) {
			builder.append("note=");
			builder.append(note);
			builder.append(", ");
		}
		if (companyId != null) {
			builder.append("companyId=");
			builder.append(companyId);
		}
		builder.append("]");
		return builder.toString();
	}

}