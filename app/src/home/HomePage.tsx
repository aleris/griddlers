import './HomePage.scss'
import React, {useContext, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {loadPacksAction} from '../actions/LoadPacksAction'
import {selectPackAction} from '../actions/SelectPackAction'
import {BoardBuilder} from '../board/BoardBuilder'
import {GameContext} from '../GameContext'
import {PackBoardView} from '../pack/PackBoardView'
import {PackGridView} from '../pack/PackGridView'
import {TrophyView} from '../pack/TrophyView'
import {BoardRegistry} from '../registry/BoardRegistry'
import {Pack, PACK_LEVEL_COUNT} from '../registry/Pack'
import {AnimatedTitle} from './AnimatedTitle'
import {PackWithProgress} from './PackWithProgress'

export const HomePage = () => {
  const {state, dispatch} = useContext(GameContext)
  const history = useHistory()

  const packs = state.packs

  const handlePackOnClick = async (pack: PackWithProgress) => {
    console.log('handlePackOnClick', pack.packId)
    await dispatch(selectPackAction(pack.packId))
    history.push('/pack')
  }

  useEffect(() => {
    dispatch(loadPacksAction());
  }, [])

  return (
    <div className="Home">
      <div className="Home--Title">
        <AnimatedTitle text="GRIDDLERS"/>
      </div>
      <div className="Home--Packs">
          {
          packs.map((pack, index) =>
            <div key={pack.packId} className="Home--Pack" style={{animationDelay: `${50 * (packs.length - index - 1)}ms`}}>
              <button onClick={() => handlePackOnClick(pack)}>
                <div className="Home--Pack--Content">
                  <div className="Home--Pack--Grid">
                    <PackGridView board={pack.coverBoard} hideFills={false} />
                  </div>
                  <div className="Home--Pack--Trophy">
                    <TrophyView completedPercent={pack.completedPercent}/>
                  </div>
                </div>
              </button>
            </div>
          )
        }
      </div>
    </div>
  )
}
