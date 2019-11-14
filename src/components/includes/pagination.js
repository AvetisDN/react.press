import React, {Component} from 'react';
import {
    Pagination, PaginationItem, PaginationLink
} from 'reactstrap';

export default class Paginator extends Component {
    renderPrevButton() {
        if(this.props.page === 1) {
            return (
                <PaginationItem disabled>
                    <PaginationLink previous href="#" />
                </PaginationItem>
            );
        } else {
            let href = `/${this.props.slug}/${(this.props.page - 1)!==1 ? (this.props.page - 1) : ''}`;
            return (
                <PaginationItem>
                    <PaginationLink previous href={href} />
                </PaginationItem>
            );
        }
    }
    renderNextButton() {
        if(this.props.page === this.props.total_pages) {
            return (
                <PaginationItem disabled>
                    <PaginationLink next href="#" />
                </PaginationItem>
            );
        } else {
            let href = `/${this.props.slug}/${this.props.page + 1}/`;
            return (
                <PaginationItem>
                    <PaginationLink next href={href} />
                </PaginationItem>
            );
        }
    }
    renderFirstButton() {
        if(this.props.page === 1) {
            return (
                <PaginationItem disabled>
                    <PaginationLink first href="#" />
                </PaginationItem>
            );
        } else {
            let href = `/${this.props.slug}/`;
            return (
                <PaginationItem>
                    <PaginationLink first href={href} />
                </PaginationItem>
            );
        }
    }
    renderLastButton() {
        if(this.props.page === this.props.total_pages) {
            return (
                <PaginationItem disabled>
                    <PaginationLink last href="#" />
                </PaginationItem>
            );
        } else {
            let href = `/${this.props.slug}/${this.props.total_pages}`;
            return (
                <PaginationItem>
                    <PaginationLink last href={href} />
                </PaginationItem>
            );
        }
    }
    rendersPageNumbers() {
        let pages = [1,2,3];
        if(this.props.page > 1 && this.props.page < this.props.total_pages) {
            pages = [this.props.page - 1, this.props.page, this.props.page*1 + 1];
        } else if(this.props.page === this.props.total_pages) {
            pages = [this.props.page - 2, this.props.page - 1, this.props.page];
        }
        let pageNumbers = pages.map(num => {
            let href = `/${this.props.slug}/${num!==1 ? num : ''}`;
            let active = num === this.props.page ? 'active' : '';
            return (
                <PaginationItem key={num} className={active}>
                    <PaginationLink href={href}>
                        {num}
                    </PaginationLink>
                </PaginationItem>
            );
        });
        return pageNumbers;
    }
    render() {
        return(
            <Pagination size="lg" aria-label="Page navigation example">
                {this.renderFirstButton()}
                {this.renderPrevButton()}
                {this.rendersPageNumbers()}
                {this.renderNextButton()}
                {this.renderLastButton()}
            </Pagination>
        );
    }
}
