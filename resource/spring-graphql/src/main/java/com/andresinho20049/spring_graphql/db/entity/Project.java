package com.andresinho20049.spring_graphql.db.entity;

import java.time.LocalDate;
import java.util.Objects;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.relational.core.mapping.Table;

@Table(name = "project")
public class Project {

    @Id
    private Long id;

    @CreatedDate
    private LocalDate createdAt;

    @LastModifiedDate
    private LocalDate updatedAt;

    @LastModifiedBy
    private String updatedUsername;

    private String name;

    private String description;

    private LocalDate projectStart;

    private LocalDate projectEnd;

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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDate getProjectStart() {
		return projectStart;
	}

	public void setProjectStart(LocalDate projectStart) {
		this.projectStart = projectStart;
	}

	public LocalDate getProjectEnd() {
		return projectEnd;
	}

	public void setProjectEnd(LocalDate projectEnd) {
		this.projectEnd = projectEnd;
	}

	public Long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}

	@Override
	public int hashCode() {
		return Objects.hash(companyId, createdAt, description, id, name, projectEnd, projectStart, updatedAt,
				updatedUsername);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Project other = (Project) obj;
		return Objects.equals(companyId, other.companyId) && Objects.equals(createdAt, other.createdAt)
				&& Objects.equals(description, other.description) && Objects.equals(id, other.id)
				&& Objects.equals(name, other.name) && Objects.equals(projectEnd, other.projectEnd)
				&& Objects.equals(projectStart, other.projectStart) && Objects.equals(updatedAt, other.updatedAt)
				&& Objects.equals(updatedUsername, other.updatedUsername);
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Project [");
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
		if (description != null) {
			builder.append("description=");
			builder.append(description);
			builder.append(", ");
		}
		if (projectStart != null) {
			builder.append("projectStart=");
			builder.append(projectStart);
			builder.append(", ");
		}
		if (projectEnd != null) {
			builder.append("projectEnd=");
			builder.append(projectEnd);
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