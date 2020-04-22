import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { FaTimes } from 'react-icons/fa'

type MyProps = { isFavorite: any, unfavorite: any, favorite: any, isHovering:any };
type MyState = { afterRemove: Boolean, added: Boolean };

export default class FavoriteStar extends React.Component<MyProps, MyState> {

  /*
  L'etat added et afterRemove serve à faire en sorte qu'aprés un click, le resultat du click soit affiché et non l'effet qu'aura le clic
  jusqu'a ce que le souris sorte de l'icon. 
  Exemple: On vient de supprimer l'item des favoris, on veut voir un dessous de la souris une etoile vide et non une etoit prete a etre validé
  Ce sera le cas jsuqu'a que la souris sorte de l'icon grave a afterRemove
  */
 
  constructor(props) {
    super(props);
    this.state = {
      afterRemove: false,
      added: false,
    };
  }

  async unfavoritePressed(e) {
    this.props.unfavorite(e)
    this.setState({ afterRemove: true })
  }

  favoritePressed(e) {
    this.props.favorite(e)
    this.setState({ added: true })
  }

  componentDidUpdate(prevProps){
    if (!this.props.isHovering && prevProps.isHovering){
      this.setState({added: false, afterRemove: false})
    }
  }

  star(isHovering) {

    if (isHovering) {

      if (this.state.afterRemove) {
        return <AiOutlineStar
          onClick={(e) => e.stopPropagation()}
          style={{ flexShrink: 0 }}
          size={40} color="#FFCC7A" />
      }

      if (this.state.added) {
        return <AiFillStar
          onClick={(e) => e.stopPropagation()}
          style={{ flexShrink: 0 }} size={40} color="#FFCC7A" />
      }

      if (this.props.isFavorite) {
        return <div
          onClick={(e) => this.unfavoritePressed(e)} >
          <span style={{ display: 'inline-block', position: 'relative', }}>
            <AiFillStar
              textAnchor="middle" alignmentBaseline="middle"
              style={{ flexShrink: 0 }} size={40} color="red" />
            <FaTimes
              textAnchor="middle"
              alignmentBaseline="middle"
              style={{ flexShrink: 0, position: 'absolute', left: '0px', }}
              color="black"
              size={40}
            />
            <FaTimes
              textAnchor="middle"
              alignmentBaseline="middle"
              style={{ flexShrink: 0, position: 'absolute', left: '5px', bottom: '5px' }}
              color="red"
              size={30}
            />
          </span>
        </div>
      }

      return <AiFillStar
        onClick={(e) => this.favoritePressed(e)}
        style={{ flexShrink: 0, height: "40px", marginRight: 5 }} size={30} color="#ffdea8" />

    }

    if (this.props.isFavorite) {
      return <AiFillStar
        style={{ flexShrink: 0 }} size={40} color="#FFCC7A" />
    }

    return <AiOutlineStar
      style={{ flexShrink: 0 }}
      size={40} color="#FFCC7A" />

  }

  render() {
    return this.star(this.props.isHovering)
  }
}
