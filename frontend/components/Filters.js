import formatPrice from '../lib/formatPrice'
import { PRICE, DIFFICULTY, ORDER_BY } from '../lib/filterConstants'

export default ({
  client,
  price,
  difficulty,
  orderBy,
  handlePrice,
  handleDifficulty,
  handleOrderBy
}) => (
  <div className="filter">
    <div className="filter__price">
      {PRICE.map(p => (
        <span
          key={p}
          className="filter__price__option"
          onClick={() => handlePrice(p, client)}
          style={{
            background: price.includes(p) && '#306AFD',
            color: price.includes(p) && 'white'
          }}
        >
          {formatPrice(p)}
        </span>
      ))}
    </div>

    <div className="filter__difficulty">
      {DIFFICULTY.map(d => (
        <span
          key={d}
          className="filter__difficulty__option"
          onClick={() => handleDifficulty(d, client)}
          style={{
            background: difficulty.includes(d) && '#306AFD',
            color: difficulty.includes(d) && 'white'
          }}
        >
          {d}
        </span>
      ))}
    </div>

    <select className="filter__orderBy" value={orderBy} onChange={handleOrderBy}>
      {ORDER_BY.map(o => (
        <option key={o.text} value={o.value}>
          {o.text}
        </option>
      ))}
    </select>
  </div>
)
